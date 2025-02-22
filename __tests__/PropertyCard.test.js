import { render, fireEvent } from "./test-utils"
import PropertyCard from "../components/property-card"

jest.mock("next/image", () => ({ src, alt }) => <img src={src || "/placeholder.svg"} alt={alt} />)

describe("PropertyCard", () => {
  const mockProps = {
    id: "1",
    image: "/test-image.jpg",
    title: "Test Property",
    price: 100000,
    specs: {
      beds: 3,
      baths: 2,
      area: "1500 sqft",
    },
    has360Tour: true,
  }

  it("renders correctly", () => {
    const { getByText, getByAltText } = render(<PropertyCard {...mockProps} />)
    expect(getByText("Test Property")).toBeInTheDocument()
    expect(getByText("$100000")).toBeInTheDocument()
    expect(getByText("3bd 2ba 1500 sqft")).toBeInTheDocument()
    expect(getByAltText("Test Property")).toBeInTheDocument()
  })

  it("toggles favorite when heart button is clicked", () => {
    const { getByRole, store } = render(<PropertyCard {...mockProps} />)
    fireEvent.click(getByRole("button", { name: /favorite/i }))
    expect(store.getState().favorites.ids).toContain("1")
  })
})

