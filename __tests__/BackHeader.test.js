import { render, fireEvent } from "./test-utils"
import { BackHeader } from "../components/back-header"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}))

describe("BackHeader", () => {
  it("renders correctly", () => {
    const { getByText } = render(<BackHeader title="Test Title" onBack={() => {}} />)
    expect(getByText("Test Title")).toBeInTheDocument()
    expect(getByText("Go Back")).toBeInTheDocument()
  })

  it("calls onBack when back button is clicked", () => {
    const mockOnBack = jest.fn()
    const { getByText } = render(<BackHeader title="Test Title" onBack={mockOnBack} />)
    fireEvent.click(getByText("Go Back"))
    expect(mockOnBack).toHaveBeenCalled()
  })
})

