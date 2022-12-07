import Child from "./Child";

const Parent = () => {

    const books = [
        {
            id: 1,
            author: "Robert Kiyosaki",
            title: "Rich dad Poor dad"
        },
        {
            id: 2,
            author: "Chethan bhagath",
            title: "Revolution 20 Twenty"
        },
        {
            id: 3,
            author: "Napoleon Hill",
            title: "Think and Grow Rich"
        },
        {
            id: 4,
            author: "Ankur Warikoo",
            title: "Do Epic Shit"
        }
    ]


    return (
        <div className="App">
            <div>
                <Child books={books} />
            </div>
        </div>
    );
}

export default Parent