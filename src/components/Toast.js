import { ShoppingBasket } from "lucide-react";

export default function Toast({ toast }) {
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      {toast && (
        <div key={toast.key} className="toast">
          <span className="toast-icon"><ShoppingBasket size={16} /></span>
          {toast.text}
        </div>
      )}
    </div>
  );
}
