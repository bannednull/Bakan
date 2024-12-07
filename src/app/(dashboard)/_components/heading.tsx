function Heading(props: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-xl font-bold">{props.title}</h1>
      <p className="text-xs text-muted-foreground">{props.description}</p>
    </div>
  );
}

export default Heading;
