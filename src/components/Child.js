import Grandchild from "./Grandchild"

const Child = (props) => {

    const books = props.books;

    return (
        <div>
            <Grandchild book={books[0]} />
            <Grandchild book={books[1]} />
            <Grandchild book={books[2]} />
            <Grandchild book={books[3]} />
        </div>
    );

};

export default Child;