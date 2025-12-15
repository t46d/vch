import Image from 'next/image';

export default function Header() {
  return (
    <header className="glass">
      <div className="logo-container">
        <Image
          src="/logo.svg"
          alt="VeXachat"
          width={180}
          height={60}
          priority
        />
      </div>
      {/* خلفية النجوم للهيدر */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg-stars.png"
          alt="Stars"
          fill
          className="opacity-30"
          quality={75}
        />
      </div>
      {/* تأثير النيون */}
      <div className="neon-effect">
        <img src="/neon-lines.svg" alt="Neon Effect" className="w-full" />
      </div>
    </header>
  );
}
