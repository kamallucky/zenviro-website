import logo from '../assets/brand/zenviro-logo.webp';
import { COMPANY } from '../config/company';

export default function Logo({ variant, className = 'h-12' }) {
  return (
    <img
      src={logo}
      alt={`${COMPANY.name} logo`}
      className={`w-auto ${className}`}
      draggable="false"
    />
  );
}
