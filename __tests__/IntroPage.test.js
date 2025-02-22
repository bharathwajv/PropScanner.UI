import { render, fireEvent } from "./test-utils"
import { IntroPage } from "../components/intro-page"

describe("IntroPage", () => {
  const mockProps = {
    background: "#FFD700",
    image: "/test-image.jpg",
    title: "Test Title",
    description: "Test Description",
    currentPage: 0,
    totalPages: 3,
    onNext: jest.fn(),
  }

  it("renders correctly", () => {
    const { getByText, getByAltText } = render(<IntroPage {...mockProps} />)
    expect(getByText("Test Title")).toBeInTheDocument()
    expect(getByText("Test Description")).toBeInTheDocument()
    expect(getByAltText("Test Title")).toBeInTheDocument()
  })

  it("calls onNext when next button is clicked", () => {
    const { getByRole } = render(<IntroPage {...mockProps} />)
    fireEvent.click(getByRole("button"))
    expect(mockProps.onNext).toHaveBeenCalled()
  })
})

