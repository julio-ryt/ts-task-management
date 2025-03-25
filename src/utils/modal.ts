export default class Modal {
  constructor() {
    const addTaskBtn = document.querySelector('.show-add-modal');
    const importBtn = document.querySelector('.import-task');
    const closeImportBtn = document.querySelector('.close-modal-import');
    const closeAddOrEditBtn = document.querySelector('.close-modal-add');

    if (addTaskBtn instanceof HTMLButtonElement) {
      addTaskBtn.addEventListener('click', () =>
        this.toggleAddOrEditModal(true)
      );
    }

    if (closeAddOrEditBtn instanceof HTMLButtonElement) {
      closeAddOrEditBtn.addEventListener('click', () =>
        this.toggleAddOrEditModal(false)
      );
    }

    if (importBtn instanceof HTMLButtonElement) {
      importBtn.addEventListener('click', () => this.toggleImportModal(true));
    }

    if (closeImportBtn instanceof HTMLButtonElement) {
      closeImportBtn.addEventListener('click', () =>
        this.toggleImportModal(false)
      );
    }
  }

  private toggleAddOrEditModal(isShow: boolean) {
    const AddOrEditModal = document.getElementById('modal-add-or-edit');

    if (AddOrEditModal instanceof HTMLDialogElement) {
      isShow ? AddOrEditModal.showModal() : AddOrEditModal.close();
    }
  }

  closeAddOrEditModal() {
    const AddOrEditModal = document.getElementById('modal-add-or-edit');

    if (AddOrEditModal instanceof HTMLDialogElement) {
      AddOrEditModal.close();
    }
  }

  private toggleImportModal(isShow: boolean) {
    const importModal = document.getElementById('import-modal');

    if (importModal instanceof HTMLDialogElement) {
      isShow ? importModal.showModal() : importModal.close();
    }
  }
}
