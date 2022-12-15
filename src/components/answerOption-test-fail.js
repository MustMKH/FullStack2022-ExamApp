import { render, screen, fireEvent } from '@testing-library/react';
import AnswerOption from "./AnswerOption"

// const mockedSetTodo = jest.fn();

describe("AnswerOption", () => {

    test('renders React App link', () => {
        render(<AnswerOption />);
        const headingElement = screen.getByText(/React App/i);
        expect(headingElement).toBeInTheDocument();
    });

    it('should render input element', () => {
        render(
            <AnswerOption
                answerOptions={[]}
            // setTodos={mockedSetTodo}
            />
        );
        // const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        // Placeholder changes so getting by title instead:
        const inputElement = screen.getByTitle(/Muokkaa vastausvaihtoehtoa/i);
        expect(inputElement).toBeInTheDocument();
    });

    /* it('should be able to type into input', () => {
        render(
            <AnswerOption
                answerOptions={[]}
            // setTodos={mockedSetTodo}
            />
        );
        const inputElement = screen.getByTitle(/Muokkaa vastausvaihtoehtoa/i);
        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: "Testivastausvaihtoehto" } })
        expect(inputElement.value).toBe("Testivastausvaihtoehto");
    }); */

})