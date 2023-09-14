import {afterAll, describe, expect, it} from "vitest";
import societyRepository from "$lib/repository/SocietyRepository/SocietyRepository";
import { uuid } from "uuidv4";
import BeeUtil from "$lib/utils/bee/bee";

describe("societyRepository", () => {
  it("should be defined", () => {
    expect(societyRepository).toBeDefined()
  })

  it("should have query method defined", () => {
    expect(societyRepository.query).toBeDefined()
  })

  it.todo("should be able to retrieve data using query method with reference as param", () => {})

  it("should have mutate method defined", () => {
    expect(societyRepository.mutate).toBeDefined()
  })

  it.skip("should attach/create new entry in societies object", async () => {
    const society = {
      id: uuid(),
      name: "Test Society",
      description: "Test Description"
    }

    const result = await societyRepository.mutate(society)

    expect(result).toBeDefined()
  })

  it.todo("should be able to update data using mutate", () => {})

  it.todo("should be able to delete data using mutate", () => {})
})
