const Footer = () => {

	const footerStyle = {
		position: "fixed",
		bottom: "20px" 
	}
  return (
    <div style={footerStyle}>
      Anecdote app for{" "}
      <a href="https://courses.helsinki.fi/fi/tkt21009">
        Full Stack -websovelluskehitys
      </a>
      . See{" "}
      <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
        https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
      </a>{" "}
      for the source code.
    </div>
  );
};

export default Footer;