// Selecionar os elementos
    const modalOverlay = document.getElementById("modal-overlay");
    const btnNovaConsulta = document.getElementById("btn-nova-consulta");
    const btnCancelar = document.getElementById("btn-cancelar");

    // Exibir o modal ao clicar no botão "Nova Consulta"
    btnNovaConsulta.addEventListener("click", () => {
        modalOverlay.style.display = "flex";
    });

    // Fechar o modal ao clicar no botão "Cancelar"
    btnCancelar.addEventListener("click", () => {
        modalOverlay.style.display = "none";
    });

    // Fechar o modal ao clicar fora da área do modal
    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.style.display = "none";
        }
    });








    document.addEventListener('DOMContentLoaded', () => {
        const btnSalvar = document.getElementById('btn-salvar');
        const btnCancelar = document.getElementById('btn-cancelar');
        const modalOverlay = document.getElementById('modal-overlay');
        const inputNome = document.getElementById('input-nome');
        const inputDescricao = document.getElementById('input-descricao');
    
        // Ao clicar em salvar
        btnSalvar.addEventListener('click', () => {
            const titulo_consulta = inputNome.value.trim();
            const descricao_consulta = inputDescricao.value.trim();
            
            fetch('/chupaleads/api/consultas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ titulo_consulta, descricao_consulta })
            })
            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                return response.json();
            })
            .then(data => {
                alert('Consulta cadastrada com sucesso!');
                modalOverlay.style.display = 'none';
                inputNome.value = '';
                inputDescricao.value = '';
            })
            .catch(err => {
                console.error('Erro ao salvar consulta:', err);
                alert('Erro ao salvar consulta. Por favor, tente novamente.');
            });
        });
    
        // Ao clicar em cancelar
        btnCancelar.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });
    });
