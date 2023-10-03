import {describe, expect, it} from "vitest";
import {SocietyRepository} from "$lib/repository/SocietyRepository/SocietyRepository";
import societyRepository from "$lib/repository/SocietyRepository";
import {BeeService} from "$lib/services/BeeService/BeeService";
import {RedisService} from "$lib/services/RedisService/RedisService";
import type {SocietyType} from "$lib/types/society";

describe("SocietyRepository", () => {
  // definitions
  it("should be defined", () => {
    expect(SocietyRepository).toBeDefined()
  })
  it("should receive beeService and redisService instance to the constructor", () => {
    const beeService = new BeeService()
    const redisService = new RedisService()
    const societyRepository = new SocietyRepository({ beeService, redisService })
    expect(societyRepository).toBeDefined()
  })
  it("should have a method called save defined", () => {
    expect(societyRepository.save).toBeDefined()
  })
  it("should have a method called update defined", () => {
    expect(societyRepository.update).toBeDefined()
  })
  it("should have a method called all defined", () => {
    expect(societyRepository.all).toBeDefined()
  })
  it("should have a method called delete defined", () => {
    expect(societyRepository.delete).toBeDefined()
  })

  // methods
  it.skip("should be able to save a society", async () => {
    const society: SocietyType = {
      name: "Society Name",
      description: "Society Description"
    }
    const savedSociety = await societyRepository.save(society)

    expect(savedSociety).toBeDefined()
  })
  it("should have a method to list all societies", async () => {
    const societies = await societyRepository.all()

    expect(societies).toBeDefined()
  })
  it.skip("should have a method to update a society", async () => {
    const existingSocieties = await societyRepository.all()
    const society = Object.values(existingSocieties)[0] as SocietyType
    society.name = "Updated Society Name"
    const updatedSociety = await societyRepository.update(society)
    expect(updatedSociety).toBeDefined()
    expect(updatedSociety.name).toEqual("Updated Society Name")
  })
  it("should have a method to delete a society", async () => {
    const existingSocieties = await societyRepository.all()
    const society = Object.values(existingSocieties)[0] as SocietyType
    const deletedSocietyId = society.id
    await societyRepository.delete(society.id as string)
    const societies = await societyRepository.all()
    console.log(societies)
    expect(societies[deletedSocietyId as string]).not.toBeDefined()
  })
})
