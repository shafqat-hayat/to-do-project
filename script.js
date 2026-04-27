const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const li = document.createElement('li');
    li.className = "group flex items-center justify-between bg-white/[0.03] border border-white/5 p-4 rounded-2xl hover:bg-white/[0.05] transition-all duration-300";
    
    li.innerHTML = `
        <div class="flex items-center gap-3 flex-1">
            <div class="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
            <span class="task-text text-slate-200 cursor-pointer transition-all">${text}</span>
        </div>
        <div class="flex items-center gap-2">
            <button class="edit-btn p-1.5 text-slate-500 hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </button>
            <button class="delete-btn p-1.5 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
        </div>
    `;

    const textSpan = li.querySelector('.task-text');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    // --- EDIT LOGIC ---
    editBtn.onclick = () => {
        if (li.classList.contains('editing')) return;
        li.classList.add('editing');

        const currentText = textSpan.innerText;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = "bg-orange-500/10 border border-orange-500/40 rounded-lg px-2 py-1 outline-none text-white text-sm w-full";

        textSpan.replaceWith(input);
        input.focus();

        const save = () => {
            textSpan.innerText = input.value.trim() || currentText;
            input.replaceWith(textSpan);
            li.classList.remove('editing');
        };

        input.onkeydown = (e) => { if (e.key === 'Enter') save(); };
        input.onblur = save;
    };

    // --- DELETE LOGIC ---
    deleteBtn.onclick = () => {
        li.style.transform = "scale(0.95)";
        li.style.opacity = "0";
        setTimeout(() => li.remove(), 200);
    };

    // --- TOGGLE COMPLETE ---
    textSpan.onclick = () => {
        if (!li.classList.contains('editing')) {
            textSpan.classList.toggle('line-through');
            textSpan.classList.toggle('opacity-40');
        }
    };

    taskList.appendChild(li);
    taskInput.value = "";
}

addBtn.onclick = addTask;
taskInput.onkeydown = (e) => { if (e.key === 'Enter') addTask(); };