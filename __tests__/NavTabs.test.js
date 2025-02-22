import { render, fireEvent } from "./test-utils"
import { NavTabs } from "../components/nav-tabs"

describe("NavTabs", () => {
  const mockProps = {
    tabs: ["Tab1", "Tab2", "Tab3"],
    selected: "Tab1",
    onSelect: jest.fn(),
  }

  it("renders correctly", () => {
    const { getByText } = render(<NavTabs {...mockProps} />)
    expect(getByText("Tab1")).toBeInTheDocument()
    expect(getByText("Tab2")).toBeInTheDocument()
    expect(getByText("Tab3")).toBeInTheDocument()
  })

  it("calls onSelect when a tab is clicked", () => {
    const { getByText } = render(<NavTabs {...mockProps} />)
    fireEvent.click(getByText("Tab2"))
    expect(mockProps.onSelect).toHaveBeenCalledWith("Tab2")
  })
})

