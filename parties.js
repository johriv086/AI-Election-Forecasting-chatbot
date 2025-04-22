document.addEventListener('DOMContentLoaded', () => {
    initializePartyDetails();
});

function initializePartyDetails() {
    // Add click handlers to view details buttons
    const viewButtons = document.querySelectorAll('.view-details');
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const partyCard = e.target.closest('.party-card');
            const partyName = partyCard.querySelector('h2').textContent;
            showPartyDetails(partyName);
        });
    });
}

function showPartyDetails(partyName) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${partyName} - Full Manifesto</h2>
            <div class="manifesto-content">
                ${getPartyManifesto(partyName)}
            </div>
        </div>
    `;

    // Add to document
    document.body.appendChild(modal);

    // Add close handler
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function getPartyManifesto(partyName) {
    // This would typically come from an API or database
    // For now, using static content
    const manifestos = {
        'Bharatiya Janata Party (BJP)': `
            <h3>Economic Development</h3>
            <ul>
                <li>Continue focus on infrastructure development</li>
                <li>Support for MSME sector</li>
                <li>Digital economy initiatives</li>
            </ul>
            <h3>National Security</h3>
            <ul>
                <li>Strengthen border security</li>
                <li>Modernize defense forces</li>
                <li>Counter-terrorism measures</li>
            </ul>
            <h3>Social Welfare</h3>
            <ul>
                <li>Expand healthcare coverage</li>
                <li>Education reforms</li>
                <li>Women empowerment programs</li>
            </ul>
        `,
        'Indian National Congress (INC)': `
            <h3>Economic Reforms</h3>
            <ul>
                <li>Job creation initiatives</li>
                <li>Support for farmers</li>
                <li>Economic stimulus packages</li>
            </ul>
            <h3>Social Justice</h3>
            <ul>
                <li>Reservation policies</li>
                <li>Minority rights protection</li>
                <li>Gender equality measures</li>
            </ul>
            <h3>Education & Healthcare</h3>
            <ul>
                <li>Universal healthcare access</li>
                <li>Education system reforms</li>
                <li>Skill development programs</li>
            </ul>
        `,
        'Aam Aadmi Party (AAP)': `
            <h3>Anti-corruption</h3>
            <ul>
                <li>Transparency in governance</li>
                <li>Whistleblower protection</li>
                <li>Accountability measures</li>
            </ul>
            <h3>Public Services</h3>
            <ul>
                <li>Quality education for all</li>
                <li>Affordable healthcare</li>
                <li>Basic amenities improvement</li>
            </ul>
            <h3>Governance</h3>
            <ul>
                <li>Decentralization of power</li>
                <li>Citizen participation</li>
                <li>Efficient service delivery</li>
            </ul>
        `,
        'Regional Parties': `
            <h3>State-specific Development</h3>
            <ul>
                <li>Regional infrastructure projects</li>
                <li>Local industry support</li>
                <li>Cultural preservation</li>
            </ul>
            <h3>State Autonomy</h3>
            <ul>
                <li>Greater state powers</li>
                <li>Resource allocation</li>
                <li>Policy implementation</li>
            </ul>
            <h3>Local Issues</h3>
            <ul>
                <li>Regional employment</li>
                <li>State-specific welfare</li>
                <li>Local governance</li>
            </ul>
        `
    };

    return manifestos[partyName] || '<p>Manifesto details not available.</p>';
}

// Add modal styles to the page
const style = document.createElement('style');
style.textContent = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }

    .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 2rem;
        width: 80%;
        max-width: 800px;
        border-radius: 10px;
        position: relative;
    }

    .close {
        position: absolute;
        right: 1rem;
        top: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .manifesto-content {
        margin-top: 1rem;
    }

    .manifesto-content h3 {
        color: var(--dark-blue);
        margin: 1.5rem 0 0.5rem;
    }

    .manifesto-content ul {
        list-style: disc;
        padding-left: 1.5rem;
        margin-bottom: 1rem;
    }

    .manifesto-content li {
        margin: 0.5rem 0;
    }
`;
document.head.appendChild(style); 