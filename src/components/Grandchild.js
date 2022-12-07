const Grandchild = (props) => {
    console.log(props);
    const book = props.book;

    return (
        <div className="main">
            <label>Title</label>
            <h2>{book.title}</h2>
            <label>Author</label>
            <h2>{book.author}</h2></div>
    )
}

export default Grandchild