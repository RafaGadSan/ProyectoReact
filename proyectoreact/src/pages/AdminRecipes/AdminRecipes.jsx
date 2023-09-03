import { Button, FormLabel, HStack, Input, Select } from "@chakra-ui/react"

export const AdminRecipes = () => {
  return (
    <HStack>
      <Button>Delete</Button>
      <FormLabel>Name:</FormLabel>
      <Input type="text" />
      <FormLabel>Ingredients:</FormLabel>
      <Select></Select>
      <Select></Select>
      <FormLabel>Preparation Time</FormLabel>
      <Input type="number" />
      <FormLabel>Preparation Steps</FormLabel>
      <Input type="text" />
      <Button>Photo</Button>
      <Button>Save</Button>
    </HStack>
  )
}
