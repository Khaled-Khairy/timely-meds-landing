import { NextResponse } from 'next/server';

// Proxy route: avoids CORS by fetching the backend server-side.
// The frontend calls /api/settings instead of the backend directly.
export async function GET() {
  try {
    const res = await fetch('https://timely-meds.onrender.com/api/settings', {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'upstream error' }, { status: res.status });
    }

    const data = await res.json() as {
      settings?: { instructionsVideoUrl?: string | null };
      instructionsVideoUrl?: string | null;
    };

    // Support both response shapes: { settings: { ... } } and flat { ... }
    const videoUrl =
      data.settings?.instructionsVideoUrl ??
      data.instructionsVideoUrl ??
      null;

    return NextResponse.json({ videoUrl });
  } catch {
    return NextResponse.json({ videoUrl: null });
  }
}
