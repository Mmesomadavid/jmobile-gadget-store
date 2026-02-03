import PrimaryLogo from "../assets/logo.png";

interface LogoProps {
  variant?: "primary" | "secondary";
}

const Logo = ({ variant = "primary" }: LogoProps) => {
  let logoSrc: string | undefined;

  switch (variant) {
    case "primary":
      logoSrc = PrimaryLogo;
      break;
    case "secondary":
      // Add secondary logo here when available
      logoSrc = undefined; 
      break;
    default:
      logoSrc = PrimaryLogo;
  }

  if (!logoSrc) return null; // avoids rendering empty img

  return (
    <div className="flex items-center justify-center">
      <img src={logoSrc} alt="Logo" className="h-32 w-auto" />
    </div>
  );
};

export default Logo;
