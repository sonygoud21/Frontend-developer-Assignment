
    async function fetchSuppliers(pageNumber, category, channel, state) {
      const baseUrl = 'https://staging.iamdave.ai';
      const pageSize = 1;

      let url = `${baseUrl}/list/supply?_page_number=${pageNumber}&_page_size=${pageSize}`;

      if (category) {
        url += `&category=${category}`;
      }

      if (channel) {
        url += `&channel=${channel}`;
      }

      if (state) {
        url += `&state=${state}`;
      }

      const response = await fetch('https://staging.iamdave.ai');
      const data = await response.json();

      const supplierList = document.getElementById('supplierList');
      supplierList.innerHTML = '';

      data.suppliers.forEach(supplier => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Display supplier information in the card
        card.innerHTML = `
          <p>Category: ${supplier.category}</p>
          <p>Channel: ${supplier.channel}</p>
          <p>Description: ${supplier.request_description}</p>
          <p>Contact Numbers: ${supplier.contact_numbers}</p>
          <p>State: ${supplier.state}</p>
          <p>District: ${supplier.district}</p>
          <p>Source Time: ${supplier.source_time}</p>
        `;
        supplierList.appendChild(card);
      });

      // Pagination
      if (!data.is_last) {
        const nextPageButton = document.createElement('button');
        nextPageButton.innerText = 'Next Page';
        nextPageButton.addEventListener('click', () => {
          fetchSuppliers(pageNumber + 1, category, channel, state);
        });
        supplierList.appendChild(nextPageButton);
      }
    }

    // Initial fetch to display the first page of suppliers
    fetchSuppliers(1);
