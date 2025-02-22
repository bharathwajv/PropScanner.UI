import { render, fireEvent } from "./test-utils"
import { SearchDrawer } from "../components/search-drawer"

describe("SearchDrawer", () => {
  it("renders correctly when open", () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchDrawer isOpen={true} onOpenChange={() => {}} onSearch={() => {}} />,
    )
    expect(getByText("Search Properties")).toBeInTheDocument()
    expect(getByPlaceholderText("Search by location, property type, or features")).toBeInTheDocument()
  })

  it("calls onSearch when Search button is clicked", () => {
    const mockOnSearch = jest.fn()
    const { getByText } = render(<SearchDrawer isOpen={true} onOpenChange={() => {}} onSearch={mockOnSearch} />)
    fireEvent.click(getByText("Search"))
    expect(mockOnSearch).toHaveBeenCalled()
  })
})

