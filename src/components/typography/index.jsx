import "./index.css";

function Typography(basement) {
  const {
    className,
    textSize = "md",
    children,
  } = basement;
  const classes = `${className} my-typography my-typography--${textSize}`;

  return (
    <p className={classes}>
      {children}
    </p>
  );
}

export default Typography;
