// import Todo from ".../controllers/todoControllers.js"

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function fetchTodosAndDisplay() {
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            const listContainer = document.getElementById('list-container');
            listContainer.innerHTML = ''; // Clear existing todos
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.setAttribute('data-id', todo.id); 
                if (todo.status === "FINISHED") {
                    li.classList.add("checked");
                }
                const p = document.createElement('p');
                li.textContent = `${todo.title}`;
                p.textContent = ` ${todo.description}`;
                li.appendChild(p);

                listContainer.appendChild(li);
                let span = document.createElement("span");
                span.setAttribute('data-id', todo.id); 
                span.textContent = "\u00d7";
                span.classList.add("delete"); 
                span.onclick = function() {
                    this.parentElement.remove(); 
                };
                li.appendChild(span);
            });
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}
document.addEventListener('DOMContentLoaded', () => {
    fetchTodosAndDisplay();
});

function AddTask() {
    const inputBox = document.getElementById('input-box');
    const inputDescBox = document.getElementById('input-desc-box');

    
    if (inputBox.value.trim() === "") {
        alert("Please enter your task.");
    } else {
        // Prepare the todo object
        const newTodo = {
            title: inputBox.value.trim(),
            // Include any other default fields you need, e.g., description
            description: inputDescBox.value.trim(),
            status: "NOT FINISH",
            time: new Date().toISOString() // Optionally include the current time
        };

        // Send the new todo to the backend
        fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Todo created:', data);
            inputBox.value = ""; // Clear the input box after successful creation
            inputDescBox.value= "";
            fetchTodosAndDisplay();
        })
        .catch(error => {
            console.error('Error creating todo:', error);
        });
    }
}

document.getElementById("list-container").addEventListener("click", async (e) => {
    const todoId = e.target.getAttribute("data-id"); // 获取待办事项的 ID
    if (e.target.tagName === "LI") {
        console.log(todoId);
        const isFinished = e.target.classList.contains("checked");
        const newStatus = isFinished ? "NOT_FINISHED" : "FINISHED";
        if (isFinished) {
            e.target.classList.remove("checked"); 
        } else {
            e.target.classList.add("checked");
        }
        const updatedStatus = {
            id: todoId,
            status: newStatus
        };
        console.log(JSON.stringify(updatedStatus));

        try {
            await fetch(`/todo`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStatus),
            });
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        console.log(todoId);
        try {
            await fetch(`/todo`, { 
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"id":todoId}) ,
            });
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }
}, false);


