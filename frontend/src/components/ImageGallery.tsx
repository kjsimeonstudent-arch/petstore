import type { Image } from '../types';

interface Props {
  images: Image[];
}

export default function ImageGallery({ images }: Props) {
  if (images.length === 0) {
    return <div className="rounded-3xl bg-slate-100 p-8 text-center text-slate-500">No photos available.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
        <img src={images[0].url} alt={images[0].altText ?? 'Pet image'} className="h-72 w-full object-cover" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {images.slice(1).map((image) => (
          <img key={image.id} src={image.url} alt={image.altText ?? 'Pet image'} className="h-36 w-full rounded-3xl object-cover" />
        ))}
      </div>
    </div>
  );
}
