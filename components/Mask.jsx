export default function Mask({ children, className = "" }) {
  return <span className={`mask ${className}`}><span>{children}</span></span>;
}
