let todos = [];
let id = 0;


/**
 * 커멘트를 입력받아 처리한다.
 * @param {'create' | 'read' | 'update' | 'delete'} command
 * @param {{ id: number, title: string, text: string } | null} value
 * */

const todoControl = (command, value) => {
    switch (command) {
      case 'create':
        createTodo(value);
        break;
      case 'read':
        readTodo();
        break;
      case 'update':
        updateTodo(value);
        break;
      case 'delete':
        deleteTodo(value);
        break;
      default:
        console.log('command error!');
    }
  };

  // 보너스: newTodo를 비구조화 할당하여 todos에 추가하세요.
/** @param {{ id: number, title: string, text: string }} newTodo */

const createTodo = (newTodo) => {
    todos.push(newTodo);
  };

  
  const readTodo = () => {
    todos.forEach((todo) => {
        console.log(`id: ${todo.id}, title: ${todo.title}, text: ${todo.text}`);
      });
  };
  

  /** @param {{ id: number, title: string, text: string }} targetTodo */
  const updateTodo = (targetTodo) => {
    let usersToUpdate = [];
    let targetTodoId = [];
    
    targetTodoId.push(targetTodo.id);
    todos = todos.map((todo) => {
      if (todo.id === targetTodo.id) {
        usersToUpdate.push(targetTodo.id);
        return targetTodo;
      } else {
        return todo;
      }
    });
    targetTodoId.filter(value =>{if(!usersToUpdate.includes(value))console.log(`id = ${value}에 맞는 todo를 찾을 수 없습니다.`); });

    // let contain = todos.filter((i) => {
    //   i.id == targetTodo.id;
    // });
    // if(contain.length === 0) {
    //   return console.log(`id = ${targetTodo.id}에 맞는 todo 없음`);
    // }
    // todos = todos.map((i) => {
    //   i.id === targetTodo.id ? targetTodo : i;
    // })
  }

  
  /** @param {number} id */
  const deleteTodo = (id) => {
   // todos = todos.filter((todo) => todo.id !== id);
   const deletedTodo = todos.find(todo => todo.id ===id);

   if(!deletedTodo) {
    console.log(`id = ${id}에 맞는 todo를 찾을 수 없습니다.`);
    return;
   }
   todos = todos.filter((todo) => todo.id !== id); 
   //매개변수로 받은 id와 일치하지 않는 todo만 걸러서 새로운 배열을 만들고
   //todos 변수에 다시 할당함 -> 해당되는 id만 담아둠
  };
  
  /** @info 테스트케이스, 이하 코드는 조작하지 마세요. '통과!!' 가 출력되어야합니다 */
const test = () => {
    todoControl('bug!!!');
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) =>
      todoControl('create', {
        id: id++,
        title: `title${idx}`,
        text: `text${idx}`,
      })
    );
    [1, 2, 10].map((id) => todoControl('delete', id));
    [3, 4, 100].map((id) =>
      todoControl('update', { id: id, title: `타이틀${id}`, text: `텍스트${id}` })
    );
    todoControl('read');
  
    const testValue = [0, 3, 4, 5, 6, 7, 8, 9].map((id) => {
      if (id === 3 || id === 4) {
        return { id: id, title: `타이틀${id}`, text: `텍스트${id}` };
      }
      return { id: id, title: `title${id}`, text: `text${id}` };
    });
  
    // true가 출력되어야합니다.
    console.log(
      JSON.stringify(testValue) === JSON.stringify(todos)
        ? '통과!!'
        : '실패!! 다시 풀어보세요'
    );
  }; 
   
  test();