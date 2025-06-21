export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 text-center border-t mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Price Tracker. Built with 💙 by Anirudh.
      </p>
    </footer>
  );
}
