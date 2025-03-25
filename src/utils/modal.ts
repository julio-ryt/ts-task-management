//@ts-nocheck

const closeAddModal = () =>
  document.getElementById('modal-add-or-edit').close();

const closeImportModal = () => document.getElementById('import-modal').close();

const showAddModalListener = () =>
  document.querySelector('.show-add-modal').addEventListener('click', () => {
    document.getElementById('modal-add-or-edit').showModal();
  });

const showImportModalListener = () =>
  document.querySelector('.import-task').addEventListener('click', () => {
    document.getElementById('import-modal').showModal();
  });

const closeAddModalListener = () =>
  document
    .querySelector('.close-modal-add')
    .addEventListener('click', closeAddModal);

const closeImportModalListener = () =>
  document
    .querySelector('.close-modal-import')
    .addEventListener('click', closeImportModal);

export {
  closeAddModal,
  closeImportModal,
  closeImportModalListener,
  showAddModalListener,
  showImportModalListener,
  closeAddModalListener,
};
