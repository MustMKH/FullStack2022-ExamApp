const mockResponse = [
    {
        title: "Tentti 1",
        id: "Javascriptin alkeet"
    },
    {
        title: "Tentti 2",
        id: "C# alkeet"
    },
    {
        title: "Tentti 3",
        id: "Pythonin alkeet"
    },
    {
        title: "Tentti 4",
        id: "Typescriptin alkeet"
    },
    {
        title: "Tentti 5",
        id: "PostreSQL alkeet"
    },
]

export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}