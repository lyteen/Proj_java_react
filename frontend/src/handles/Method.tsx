import * as React from 'react';

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
    } catch (error) {
      console.error('Error adding person:', error);
    }
};
