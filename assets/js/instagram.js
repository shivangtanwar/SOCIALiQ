// Function to fetch Instagram Follower Count and Account Name (using Instagram Graph API)
  async function fetchInstagramFollowers() {
    const accessToken = 'IGQWRQQ1FDQ3ltX2ppVFlodGZAzVFFPbmFiSGVvSmh5cjI1bHBQY1ppSFVENFZAsV0g1bGtKbUxsa3c4RGFTZA0N4VVo1MWVWa1Vsek5mY21BZAlFrc2RWcDc2akFPajk1ZAzdtYjF6eXVsMFdsb2V3VURSbXMyaHFSdWMZD';  // Replace with your actual Instagram Access Token
    const igUserId = '17841449204339393';  // Replace with your Instagram User ID (Business Account ID)

    const apiUrl = `https://graph.instagram.com/${igUserId}?fields=followers_count,username&access_token=${accessToken}`;

    // Make the API call to get Instagram follower count and account name
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Get the current follower count and username from the response
    const followerCount = data.followers_count;
    const accountName = data.username;  // Instagram account name

    // Update the HTML with the Instagram account name and follower count
    document.getElementById('instagram-follower-count').textContent = `Followers: ${followerCount}`;
    document.getElementById('instagram-account-name').textContent = `Instagram Account: ${accountName}`;

    // Generate the follower growth trend (simulate it using random numbers)
    const followerGrowthData = generateFollowerGrowth(followerCount);
    renderInstagramFollowerGrowthChart(followerGrowthData);
  }

// Function to generate simulated Instagram follower growth trend
  function generateFollowerGrowth(currentFollowerCount) {
    let growthData = [];
    for (let i = 0; i < 7; i++) {
      const randomGrowth = Math.floor(Math.random() * 50) + 1;  // Random growth between 1 and 50 followers
      growthData.push(currentFollowerCount + randomGrowth);
      currentFollowerCount += randomGrowth;  // Increment for the next day
    }
    return growthData.reverse();  // Reverse the data to show the progression from Mon to Sun
  }

// Function to render the Instagram Follower Growth Chart using ApexCharts
  function renderInstagramFollowerGrowthChart(followerGrowthData) {
    var options = {
      chart: {
        height: 150,  // Adjusted height for visibility
        type: 'area',
        toolbar: { show: false },
        sparkline: { enabled: true }
      },
      markers: {
        colors: 'transparent',
        strokeColors: 'transparent'
      },
      grid: { show: false },
      colors: ['#E4405F'],  // Instagram brand color (you can change it)
      fill: {
        type: 'gradient',
        gradient: { shade: 'light', shadeIntensity: 0.8, opacityFrom: 0.6, opacityTo: 0.1 }
      },
      dataLabels: { enabled: false },
      stroke: { width: 2, curve: 'smooth' },
      series: [
        {
          name: 'Followers',
          data: followerGrowthData  // Use the dynamically generated growth data
        }
      ],
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],  // Days of the week
        labels: { show: true },
        axisBorder: { show: false }
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (value) {
            return Math.round(value);  // Round the values to avoid decimals
          }
        }
      },
      tooltip: { enabled: true }
    };

    // Create and render the ApexCharts instance
    var chart = new ApexCharts(document.querySelector("#weeklyInstagramFollowerReports"), options);
    chart.render();
  }

// Call the function to fetch Instagram follower count and render the chart when the page loads
  window.onload = function() {
    fetchInstagramFollowers();
  };