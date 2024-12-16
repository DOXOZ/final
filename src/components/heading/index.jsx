import "./index.css";

function Header(basement) {
  const {
    className,
    level = 1,
    children,
  } = basement;
  const classes = `${className} my-header my-header--${level}`;

  return (
    <p className={classes}>
      {children}
    </p>
  );
}

export default Header;
