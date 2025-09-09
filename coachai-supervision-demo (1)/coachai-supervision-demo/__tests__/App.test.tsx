import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("CoachAI Demo", () => {
  test("默认不显示示例报告，点击导航后显示", async () => {
    render(<App />);
    expect(screen.queryByTestId("section-report")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("示例报告"));
    expect(await screen.findByTestId("section-report")).toBeInTheDocument();
  });

  test("成长追踪为独立 section，始终存在", () => {
    render(<App />);
    expect(screen.getByTestId("section-progress")).toBeInTheDocument();
  });

  test("能力细分渲染 8 项（在报告显示后）", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("示例报告"));
    const compSection = await screen.findByTestId("section-competencies");
    const cards = compSection.querySelectorAll("[data-comp-card]");
    expect(cards.length).toBe(8);
  });
});
