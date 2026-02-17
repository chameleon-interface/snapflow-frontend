'use client';

export function OAuthLoadingState() {
  return (
    <div style={{ textAlign: 'center', padding: 32 }}>
      <h2> authorization</h2>
      <p>Authorizing… Please wait</p>
      <div style={{ marginTop: 16 }}>⏳</div>
    </div>
  );
}
