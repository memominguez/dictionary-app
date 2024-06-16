export default function ErrorMessage() {

  return (
    <section className="container">
      <div className="error-message">
        <div> 😞 </div>
        <h1>No Definitions Found</h1>
        <p>
          Sorry pal, we couldn&apos;t find definitions for the word you were
          looking for. You can try the search again at a later time or head to
          the web instead.
        </p>
      </div>
    </section>
  );
}
