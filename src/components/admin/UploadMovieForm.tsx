"use client";

import { useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { LANGUAGES, CATEGORIES, QUALITIES } from "@/utils/constants";

interface UploadMovieFormProps {
  onSuccess?: () => void;
}

export default function UploadMovieForm({ onSuccess }: UploadMovieFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    poster: "",
    banner: "",
    description: "",
    year: "",
    language: "Telugu",
    category: "Latest",
    quality: "720p",
    rating: "",
    tags: [] as string[],
    embedIframeLink: "",
    downloadLink: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const adminKey = sessionStorage.getItem("adminKey");
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey || "",
        },
        body: JSON.stringify({
          type: "movie",
          ...formData,
          rating: formData.rating ? parseFloat(formData.rating) : undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Movie uploaded successfully!");
        setFormData({
          title: "",
          poster: "",
          banner: "",
          description: "",
          year: "",
          language: "Telugu",
          category: "Latest",
          quality: "720p",
          rating: "",
          tags: [],
          embedIframeLink: "",
          downloadLink: "",
        });
        onSuccess?.();
      } else {
        setMessage(data.error || "Failed to upload movie");
      }
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-card rounded-2xl border border-border p-6 space-y-6"
    >
      <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
        <Upload className="w-5 h-5 text-primary-gold" />
        Upload Movie
      </h2>

      {message && (
        <div className={`p-4 rounded-xl ${message.includes("success") ? "bg-accent-green/10 text-accent-green" : "bg-red-500/10 text-red-500"}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <Input
          label="Title *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter movie title"
        />

        {/* Year */}
        <Input
          label="Year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="e.g., 2024"
        />

        {/* Poster URL */}
        <Input
          label="Poster URL *"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          required
          placeholder="https://example.com/poster.jpg"
        />

        {/* Banner URL */}
        <Input
          label="Banner URL"
          name="banner"
          value={formData.banner}
          onChange={handleChange}
          placeholder="https://example.com/banner.jpg"
        />

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">Language</label>
          <select
            name="language"
            value={formData.language}
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

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">Category</label>
          <select
            name="category"
            value={formData.category}
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

        {/* Quality */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">Quality</label>
          <select
            name="quality"
            value={formData.quality}
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

        {/* Rating */}
        <Input
          label="Rating (0-10)"
          name="rating"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          placeholder="e.g., 8.5"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-text-muted mb-1.5">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary-gold resize-none"
          placeholder="Enter movie description..."
        />
      </div>

      {/* Tags */}
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
          {formData.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Embed Iframe URL (Watch Link)"
          name="embedIframeLink"
          value={formData.embedIframeLink}
          onChange={handleChange}
          placeholder="https://example.com/embed/..."
        />
        <Input
          label="Download URL *"
          name="downloadLink"
          value={formData.downloadLink}
          onChange={handleChange}
          required
          placeholder="https://drive.google.com/..."
        />
      </div>

      <Button type="submit" size="lg" isLoading={isLoading} className="w-full">
        Upload Movie
      </Button>
    </motion.form>
  );
}
