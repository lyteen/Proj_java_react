// ========= Method =========
export const handleAddPerson = async (
    name: string,
    age: number,
    position: string,
    salary: number,
    bonus: number | null,
    stock: number | null,
    use_device: string | null
  ) => {
    const addNew = { name, age, position, salary, bonus, stock, use_device };
  
    try {
      const response = await fetch('/api/addPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNew),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Person added:', result);
      
      return result;
      
    } catch (error) {
      console.error('Error adding person:', error);
    }
};

export const handleDeletePerson = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`/api/deletePerson/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'Failed to delete'}`);
    }
    
    console.log(`Person with id ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};
// ========= End =========