
document.addEventListener('DOMContentLoaded', function() {
    
    
    const grossInput = document.getElementById('grossSalary');
    const allowInput = document.getElementById('allowances');
    deductInput = document.getElementById('deductions');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const grossResult = document.getElementById('grossResult');
    const payeResult = document.getElementById('payeResult');
    const netResult = document.getElementById('netResult');
    const errorDiv = document.getElementById('errorMsg');

    
    function calculatePAYE(income) {
        if (income <= 0) return 0;

        let tax = 0;
        if (income <= 3600) {
            tax = 0;
        } else if (income <= 4200) {
            tax = (income - 3600) * 0.25;
        } else if (income <= 4800) {
            tax = (600 * 0.25) + (income - 4200) * 0.30;
        } else if (income <= 6600) {
            tax = (600 * 0.25) + (600 * 0.30) + (income - 4800) * 0.35;
        } else {
            tax = (600 * 0.25) + (600 * 0.30) + (1800 * 0.35) + (income - 6600) * 0.375;
        }
        return tax;
    }

   
    function validateInputs() {
        
        if (grossInput.value.trim() === '' || allowInput.value.trim() === '' || deductInput.value.trim() === '') {
            errorDiv.textContent = 'All fields are required.';
            return false;
        }

        
        const gross = parseFloat(grossInput.value);
        const allow = parseFloat(allowInput.value);
        const deduct = parseFloat(deductInput.value);

        if (isNaN(gross) || isNaN(allow) || isNaN(deduct)) {
            errorDiv.textContent = 'Please enter valid numbers only.';
            return false;
        }

       
        if (gross < 0 || allow < 0 || deduct < 0) {
            errorDiv.textContent = 'Values cannot be negative.';
            return false;
        }

        
        errorDiv.textContent = '';
        return true;
    }

    
    function calculateResults() {
        if (!validateInputs()) return;

        
        const gross = parseFloat(grossInput.value);
        const allow = parseFloat(allowInput.value);
        const deduct = parseFloat(deductInput.value);

      
        const totalGross = gross + allow;

        
        let taxableIncome = totalGross - deduct;
        if (taxableIncome < 0) taxableIncome = 0;  

        
        const paye = calculatePAYE(taxableIncome);

       
        const net = totalGross - paye - deduct;

        
        grossResult.textContent = `K ${totalGross.toFixed(2)}`;
        payeResult.textContent = `K ${paye.toFixed(2)}`;
        netResult.textContent = `K ${net.toFixed(2)}`;
    }

    
    function resetForm() {
        grossInput.value = '';
        allowInput.value = '';
        deductInput.value = '';
        grossResult.textContent = 'K 0.00';
        payeResult.textContent = 'K 0.00';
        netResult.textContent = 'K 0.00';
        errorDiv.textContent = '';
    }

    
    calculateBtn.addEventListener('click', calculateResults);
    resetBtn.addEventListener('click', resetForm);

    grossInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateResults();
    });
    allowInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateResults();
    });
    deductInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateResults();
    });
});