export const Heading = (props: { title: string; description: string }) => {
  return (
    <div className="space-y-1">
      <h1 className="text-xl font-bold">{props.title}</h1>
      <p className="text-xs text-muted-foreground">{props.description}</p>
    </div>
  );
};
