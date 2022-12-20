import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Exams from '../components/Exams'

const MockExams = () => {
    return (
        <BrowserRouter>
            <Exams />
        </BrowserRouter>
    )
}

describe("MockExams - list of exams", () => {

    test('renders learn react link', () => {
        render(<MockExams />);
        const linkElement = screen.queryByText(/learn react/i);
        expect(linkElement).not.toBeInTheDocument();
    })

    /*     test('renders the correct amount of exams', async () => {
            render(<MockExams />);
            const examDivElement = await screen.findByTestId("exam-item-0");
            expect(examDivElement).toBeInTheDocument();
        }) */

    /*     test('renders multiple exams', async () => {
            render(<MockExams />);
            const examDivElements = await screen.findByTestId(/exam-item/i);
            expect(examDivElements.length).toBe(5);
        }) */

})