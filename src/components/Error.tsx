import "../styles/Error.scss";

export default function ErrorComponent() {
  return (
    <div className="error-container">
      <div className="text">404</div>
      <p>Not Found</p>
      <p>The resource requested could not be found on this server!</p>
    </div>
  );
}
