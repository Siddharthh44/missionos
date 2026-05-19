import { describe, expect, it } from "vitest";
import { buildCommandGroups } from "@/features/command-palette/build-commands";
import { filterCommandGroups } from "@/features/command-palette/filter-commands";

describe("buildCommandGroups", () => {
  it("excludes admin-only navigation for employees", () => {
    const groups = buildCommandGroups("employee");
    const navigation = groups.find((g) => g.id === "navigation")!;
    const hrefs = navigation.items.map((item) =>
      item.action.type === "navigate" ? item.action.href : "",
    );

    expect(hrefs).not.toContain("/admin");
    expect(hrefs).not.toContain("/admin/audit");
    expect(hrefs).not.toContain("/team");
    expect(hrefs).not.toContain("/review");
  });

  it("includes manager operational routes", () => {
    const groups = buildCommandGroups("manager");
    const navigation = groups.find((g) => g.id === "navigation")!;
    const hrefs = navigation.items.map((item) =>
      item.action.type === "navigate" ? item.action.href : "",
    );

    expect(hrefs).toContain("/team");
    expect(hrefs).toContain("/review");
    expect(hrefs).toContain("/admin/shared-missions");
    expect(hrefs).not.toContain("/admin/audit");
  });

  it("includes mission catalog entries with detail routes", () => {
    const groups = buildCommandGroups("employee");
    const missions = groups.find((g) => g.id === "missions")!;

    expect(missions.items.length).toBeGreaterThan(0);
    expect(
      missions.items.some(
        (item) =>
          item.label === "Reliability Control Plane" &&
          item.action.type === "navigate" &&
          item.action.href === "/missions/mission-reliability-control-plane",
      ),
    ).toBe(true);
  });

  it("includes create mission quick action when route is allowed", () => {
    const employee = buildCommandGroups("employee").find((g) => g.id === "actions")!;
    expect(employee.items.some((item) => item.id === "action-create-mission")).toBe(
      true,
    );
  });

  it("includes review queue for managers only", () => {
    const manager = buildCommandGroups("manager").find((g) => g.id === "actions")!;
    const employee = buildCommandGroups("employee").find((g) => g.id === "actions")!;

    expect(manager.items.some((item) => item.id === "action-review-queue")).toBe(
      true,
    );
    expect(employee.items.some((item) => item.id === "action-review-queue")).toBe(
      false,
    );
  });
});

describe("filterCommandGroups", () => {
  it("filters missions by search query", () => {
    const groups = buildCommandGroups("manager");
    const filtered = filterCommandGroups(groups, "reliability");

    const missions = filtered.find((g) => g.id === "missions");
    expect(missions?.items.length).toBe(1);
    expect(missions?.items[0]?.label).toContain("Reliability");
  });

  it("returns all groups when query is empty", () => {
    const groups = buildCommandGroups("admin");
    expect(filterCommandGroups(groups, "")).toEqual(groups);
  });
});
