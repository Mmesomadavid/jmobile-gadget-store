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
      logoSrc = undefined;
      break;
    default:
      logoSrc = PrimaryLogo;
  }

  if (!logoSrc) return null;

  return (
    <div className="flex items-center justify-center min-h-[56px]">
      <img
        src={logoSrc}
        alt="Logo"
        className="h-16 sm:h-20 md:h-24 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
