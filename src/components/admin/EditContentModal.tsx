"use client";

import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { IContent, ISeason } from "@/models/Content";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { LANGUAGES, CATEGORIES, QUALITIES } from "@/utils/constants";
import SeasonEpisodeBuilder from "./SeasonEpisodeBuilder";

interface EditContentModalProps {
  content: IContent;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditContentModal({ content, isOpen, onClose, onSuccess }: EditContentModalProps) {
  const [formData, setFormData] = useState<Partial<IContent>>({});
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (content) {
      setFormData({ ...content });
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim()] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags?.filter((t) => t !== tag) || [] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const adminKey = sessionStorage.getItem("adminKey");
      const response = await fetch(`/api/content/${content._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey || "",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Updated successfully!");
        onSuccess();
      } else {
        setMessage(data.error || "Failed to update");
      }
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const isMovie = content.type === "movie";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit ${isMovie ? "Movie" : "Series"}`} size="full">
      <form onSubmit={handleSubmit} className="space-y-6 h-full overflow-y-auto pb-20">
        {message && (
          <div className={`p-4 rounded-xl ${message.includes("success") ? "bg-accent-green/10 text-accent-green" : "bg-red-500/10 text-red-500"}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title *"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Year"
            name="year"
            value={formData.year || ""}
            onChange={handleChange}
          />
          <Input
            label="Poster URL *"
            name="poster"
            value={formData.poster || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Banner URL"
            name="banner"
            value={formData.banner || ""}
            onChange={handleChange}
          />
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">Language</label>
            <select
              name="language"
              value={formData.language || "Telugu"}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-primary-gold"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          {isMovie && (
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1.5">Category</label>
              <select
                name="category"
                value={formData.category || "Latest"}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-primary-gold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
          {isMovie && (
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1.5">Quality</label>
              <select
                name="quality"
                value={formData.quality || "720p"}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-primary-gold"
              >
                {QUALITIES.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Input
            label="Rating (0-10)"
            name="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formData.rating || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-primary-gold resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Add a tag"
              className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary-gold"
            />
            <Button type="button" onClick={addTag} variant="outline">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {isMovie ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
            <Input
              label="Embed Iframe URL"
              name="embedIframeLink"
              value={formData.embedIframeLink || ""}
              onChange={handleChange}
            />
            <Input
              label="Download URL"
              name="downloadLink"
              value={formData.downloadLink || ""}
              onChange={handleChange}
            />
          </div>
        ) : (
          <SeasonEpisodeBuilder
            seasons={formData.seasons || []}
            onChange={(seasons) => setFormData((prev) => ({ ...prev, seasons }))}
          />
        )}

        <div className="flex gap-4 pt-4">
          <Button type="submit" isLoading={isLoading} className="flex-1">
            Save Changes
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
