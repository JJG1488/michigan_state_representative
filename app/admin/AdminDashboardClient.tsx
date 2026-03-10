'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import Modal from '@/components/ui/Modal';

interface EventRow {
  id: string;
  title: string | null;
  image_url: string;
  image_path: string;
  created_at: string;
}

interface AdminDashboardClientProps {
  events: EventRow[];
  userEmail: string;
}

export default function AdminDashboardClient({ events, userEmail }: AdminDashboardClientProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<EventRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      setUploadError('Please select an image file.');
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setUploadError('Image must be under 10MB.');
      return;
    }

    setFile(selected);
    setUploadError('');
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(selected);
  }

  function clearForm() {
    setTitle('');
    setFile(null);
    setPreview(null);
    setUploadError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setUploadError('Please select an image to upload.');
      return;
    }

    setUploading(true);
    setUploadError('');

    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filePath = `flyers/${fileName}`;

    const { error: storageError } = await supabase.storage
      .from('event-flyers')
      .upload(filePath, file);

    if (storageError) {
      setUploadError('Failed to upload image. Please try again.');
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('event-flyers')
      .getPublicUrl(filePath);

    const { error: dbError } = await supabase
      .from('events')
      .insert({
        title: title.trim() || null,
        image_url: publicUrl,
        image_path: filePath,
      });

    if (dbError) {
      // Clean up the uploaded file on DB error
      await supabase.storage.from('event-flyers').remove([filePath]);
      setUploadError('Failed to save event. Please try again.');
      setUploading(false);
      return;
    }

    clearForm();
    setUploading(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);

    const supabase = createClient();

    // Delete from storage
    await supabase.storage
      .from('event-flyers')
      .remove([deleteTarget.image_path]);

    // Delete from database
    await supabase
      .from('events')
      .delete()
      .eq('id', deleteTarget.id);

    setDeleteTarget(null);
    setDeleting(false);
    router.refresh();
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Event Management</h1>
          <p className="text-sm text-text-muted mt-1">{userEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text border border-border rounded-lg hover:bg-surface transition-colors"
        >
          Log Out
        </button>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-surface rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-text mb-4">Upload Event Flyer</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text mb-1.5">
              Title (optional)
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Town Hall — March 15"
              className="w-full px-4 py-3 rounded-lg border border-border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="flyer" className="block text-sm font-medium text-text mb-1.5">
              Flyer Image *
            </label>
            <input
              ref={fileInputRef}
              id="flyer"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-cta-hover file:cursor-pointer file:transition-colors"
            />
            <p className="mt-1 text-xs text-text-muted">PNG, JPG, or WebP — max 10MB</p>
          </div>

          {preview && (
            <div className="relative w-48">
              <Image
                src={preview}
                alt="Preview"
                width={192}
                height={248}
                className="rounded-lg border border-border object-cover"
              />
              <button
                type="button"
                onClick={clearForm}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                aria-label="Remove image"
              >
                &times;
              </button>
            </div>
          )}

          {uploadError && (
            <p className="text-sm text-red-500" role="alert">{uploadError}</p>
          )}

          <button
            type="submit"
            disabled={uploading || !file}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-cta-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload Flyer'}
          </button>
        </div>
      </form>

      {/* Events List */}
      <div>
        <h2 className="text-lg font-semibold text-text mb-4">
          Uploaded Events ({events.length})
        </h2>
        {events.length === 0 ? (
          <p className="text-text-muted text-center py-8">No events uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={event.image_url}
                    alt={event.title || 'Event flyer'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-3">
                  {event.title && (
                    <p className="font-medium text-text text-sm truncate">{event.title}</p>
                  )}
                  <p className="text-xs text-text-muted mt-1">
                    {new Date(event.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <button
                    onClick={() => setDeleteTarget(event)}
                    className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <div className="bg-white rounded-xl p-6 max-w-sm mx-auto">
          <h3 className="text-lg font-bold text-text mb-2">Delete Event?</h3>
          <p className="text-sm text-text-muted mb-6">
            This will permanently remove the flyer{deleteTarget?.title ? ` "${deleteTarget.title}"` : ''} from the site.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 text-sm font-medium text-text-muted border border-border rounded-lg hover:bg-surface transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
