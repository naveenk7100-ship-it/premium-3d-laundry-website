import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'FreshFold — Premium Eco-Care Laundry & Valet Atelier';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050d1a',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(14, 165, 233, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(6, 182, 212, 0.15) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Glow ambient circle */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(6, 182, 212, 0.2)',
            filter: 'blur(100px)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #06b6d4, #0284c7, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
            }}
          >
            🫧
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 800,
              letterSpacing: '-1px',
              background: 'linear-gradient(135deg, #ffffff, #7dd3fc, #38bdf8)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            FreshFold
          </span>
        </div>

        <h1
          style={{
            fontSize: '56px',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: '900px',
            margin: '0 0 20px 0',
            letterSpacing: '-1.5px',
          }}
        >
          Artisanal Eco-Care Laundry & Couture Valet
        </h1>

        <p
          style={{
            fontSize: '24px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '750px',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Zero-PERC organic dry cleaning • Ozone cold hydro-wash • Italian dry steam press • 24h doorstep pickup
        </p>

        <div
          style={{
            display: 'flex',
            gap: '30px',
            marginTop: '40px',
            fontSize: '18px',
            color: '#38bdf8',
            fontWeight: 600,
          }}
        >
          <span>✦ 100% segregated wash</span>
          <span>✦ Live 5-stage telemetry</span>
          <span>✦ $1,000 garment protection</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
