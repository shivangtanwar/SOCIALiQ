/**
 * Dashboard Analytics
 */

'use strict';

(function () {
  let cardColor, headingColor, labelColor, shadeColor, grayColor;
  if (isDarkStyle) {
    cardColor = config.colors_dark.cardColor;
    labelColor = config.colors_dark.textMuted;
    headingColor = config.colors_dark.headingColor;
    shadeColor = 'dark';
    grayColor = '#5E6692'; // gray color is for stacked bar chart
  } else {
    cardColor = config.colors.cardColor;
    labelColor = config.colors.textMuted;
    headingColor = config.colors.headingColor;
    shadeColor = '';
    grayColor = '#817D8D';
  }

  // swiper loop and autoplay
  // --------------------------------------------------------------------
  const swiperWithPagination = document.querySelector('#swiper-with-pagination-cards');
  if (swiperWithPagination) {
    new Swiper(swiperWithPagination, {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        clickable: true,
        el: '.swiper-pagination'
      }
    });
  }

  // Average Daily Sales
  // --------------------------------------------------------------------
  const averageDailySalesEl = document.querySelector('#averageDailySales'),
    averageDailySalesConfig = {
      chart: {
        height: 105,
        type: 'area',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      markers: {
        colors: 'transparent',
        strokeColors: 'transparent'
      },
      grid: {
        show: false
      },
      colors: [config.colors.success],
      fill: {
        type: 'gradient',
        gradient: {
          shade: shadeColor,
          shadeIntensity: 0.8,
          opacityFrom: 0.6,
          opacityTo: 0.1
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      series: [
        {
          data: [400, 200, 650, 500]
        }
      ],
      xaxis: {
        show: true,
        lines: {
          show: false
        },
        labels: {
          show: false
        },
        stroke: {
          width: 0
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        stroke: {
          width: 0
        },
        show: false
      },
      tooltip: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 1387,
          options: {
            chart: {
              height: 80
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              height: 123
            }
          }
        }
      ]
    };
  if (typeof averageDailySalesEl !== undefined && averageDailySalesEl !== null) {
    const averageDailySales = new ApexCharts(averageDailySalesEl, averageDailySalesConfig);
    averageDailySales.render();
  }


// Function to fetch YouTube Channel Info (including channel name and subscriber count)
  async function fetchYouTubeChannelInfo() {
    const apiKey = 'AIzaSyDxMJdl4HxxyDLi15oBEXW_-3Rq5wKvDpw';  // Replace with your actual API Key
    const channelId = 'UCZaT_X_mc0BI-djXOlfhqWQ';    // Replace with the channel ID (you can get this from the YouTube channel URL)

    // Make API call to get channel statistics
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
    const data = await response.json();

    // Get the channel name and subscriber count
    const channelName = data.items[0].snippet.title;
    const subscriberCount = parseInt(data.items[0].statistics.subscriberCount);

    // Update the HTML with the channel name and subscriber count
    document.getElementById('channel-name').textContent = channelName;  // Set channel name in the HTML
    document.getElementById('youtube-subscribers').textContent = `Subscribers: ${subscriberCount}`;  // Set subscriber count

    // Generate dynamic subscriber growth data based on the current subscriber count
    const subscriberGrowthData = generateSubscriberGrowth(subscriberCount);  // Generate growth data
    renderSubscriberGrowthChart(subscriberGrowthData);  // Render the chart with the generated data
  }

// Function to generate a simulated subscriber growth trend based on the current subscriber count
  function generateSubscriberGrowth(currentSubscriberCount) {
    let growthData = [];
    // Simulating daily growth over 7 days with some random fluctuation
    for (let i = 0; i < 7; i++) {
      const randomGrowth = Math.floor(Math.random() * 50) + 1;  // Random growth between 1 and 50
      growthData.push(currentSubscriberCount + randomGrowth);
      currentSubscriberCount += randomGrowth;  // Increment for the next day
    }
    return growthData.reverse();  // Reverse the data to show the progression from Mon to Sun
  }

// Function to render the subscriber growth chart using ApexCharts
  function renderSubscriberGrowthChart(subscriberGrowthData) {
    var options = {
      chart: {
        height: 150,  // Increased height for better visibility
        type: 'area',
        toolbar: { show: false },
        sparkline: { enabled: true }
      },
      markers: {
        colors: 'transparent',
        strokeColors: 'transparent'
      },
      grid: { show: false },
      colors: ['#00E396'],  // Set the color for the chart line
      fill: {
        type: 'gradient',
        gradient: { shade: 'light', shadeIntensity: 0.8, opacityFrom: 0.6, opacityTo: 0.1 }
      },
      dataLabels: { enabled: false },
      stroke: { width: 2, curve: 'smooth' },
      series: [
        {
          name: 'Subscribers',
          data: subscriberGrowthData  // Use the dynamically generated growth data
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
    var chart = new ApexCharts(document.querySelector("#youtubeSubscriberChart"), options);
    chart.render();
  }

// Call the function to fetch YouTube channel info and render the chart when the page loads
  window.onload = function() {
    fetchYouTubeChannelInfo();
  };





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




  // Function to fetch YouTube Channel Info (including channel name and subscriber count)
  async function fetchYouTubeChannelInfo() {
    const apiKey = 'AIzaSyDxMJdl4HxxyDLi15oBEXW_-3Rq5wKvDpw';  // Replace with your actual API Key
    const channelId = 'UCZaT_X_mc0BI-djXOlfhqWQ';    // Replace with the channel ID (you can get this from the YouTube channel URL)

    try {
      // Make API call to get channel statistics
      const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);

      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.statusText}`);
      }
      const data = await response.json();

      // Get the channel name and subscriber count
      const channelName = data.items[0].snippet.title;
      const subscriberCount = parseInt(data.items[0].statistics.subscriberCount);

      // Update the HTML with the channel name and subscriber count
      document.getElementById('channel-name').textContent = channelName;  // Set channel name in the HTML
      document.getElementById('youtube-subscribers').textContent = `Subscribers: ${subscriberCount}`;  // Set subscriber count

      // Generate dynamic subscriber growth data based on the current subscriber count
      const subscriberGrowthData = generateSubscriberGrowth(subscriberCount);  // Generate growth data
      renderSubscriberGrowthChart(subscriberGrowthData);  // Render the chart with the generated data
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      document.getElementById('channel-name').textContent = 'Error fetching YouTube data';
      document.getElementById('youtube-subscribers').textContent = 'Error';
    }
  }

// Function to fetch Instagram Follower Count and Account Name (using Instagram Graph API)
  async function fetchInstagramFollowers() {
    const accessToken = 'IGQWRQQ1FDQ3ltX2ppVFlodGZAzVFFPbmFiSGVvSmh5cjI1bHBQY1ppSFVENFZAsV0g1bGtKbUxsa3c4RGFTZA0N4VVo1MWVWa1Vsek5mY21BZAlFrc2RWcDc2akFPajk1ZAzdtYjF6eXVsMFdsb2V3VURSbXMyaHFSdWMZD';  // Replace with your actual Instagram Access Token
    const igUserId = '17841449204339393';  // Replace with your Instagram User ID (Business Account ID)

    const apiUrl = `https://graph.instagram.com/${igUserId}?fields=followers_count,username&access_token=${accessToken}`;

    try {
      // Make the API call to get Instagram follower count and account name
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Instagram API Error: ${response.statusText}`);
      }

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
    } catch (error) {
      console.error('Error fetching Instagram data:', error);
      document.getElementById('instagram-follower-count').textContent = 'Error fetching data';
      document.getElementById('instagram-account-name').textContent = 'Error';
    }
  }

// Call the function to fetch YouTube channel info and render the chart when the page loads
  window.onload = function() {
    fetchYouTubeChannelInfo();
    fetchInstagramFollowers();
  };







  // Support Tracker - Radial Bar Chart
  // --------------------------------------------------------------------
  const supportTrackerEl = document.querySelector('#supportTracker'),
    supportTrackerOptions = {
      series: [85],
      labels: ['Completed Task'],
      chart: {
        height: 360,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -140,
          endAngle: 130,
          hollow: {
            size: '65%'
          },
          track: {
            background: cardColor,
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: -20,
              color: labelColor,
              fontSize: '13px',
              fontWeight: '400',
              fontFamily: 'Public Sans'
            },
            value: {
              offsetY: 10,
              color: headingColor,
              fontSize: '38px',
              fontWeight: '400',
              fontFamily: 'Public Sans'
            }
          }
        }
      },
      colors: [config.colors.primary],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.5,
          gradientToColors: [config.colors.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.6,
          stops: [30, 70, 100]
        }
      },
      stroke: {
        dashArray: 10
      },
      grid: {
        padding: {
          top: -20,
          bottom: 5
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      },
      responsive: [
        {
          breakpoint: 1025,
          options: {
            chart: {
              height: 330
            }
          }
        },
        {
          breakpoint: 769,
          options: {
            chart: {
              height: 280
            }
          }
        }
      ]
    };
  if (typeof supportTrackerEl !== undefined && supportTrackerEl !== null) {
    const supportTracker = new ApexCharts(supportTrackerEl, supportTrackerOptions);
    supportTracker.render();
  }

  // Total Earning Chart - Bar Chart
  // --------------------------------------------------------------------
  const totalEarningChartEl = document.querySelector('#totalEarningChart'),
    totalEarningChartOptions = {
      series: [
        {
          name: 'Earning',
          data: [15, 10, 20, 8, 12, 18, 12, 5]
        },
        {
          name: 'Expense',
          data: [-7, -10, -7, -12, -6, -9, -5, -8]
        }
      ],
      chart: {
        height: 175,
        parentHeightOffset: 0,
        stacked: true,
        type: 'bar',
        toolbar: { show: false }
      },
      tooltip: {
        enabled: false
      },
      legend: {
        show: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          borderRadius: 6,
          startingShape: 'rounded',
          endingShape: 'rounded'
        }
      },
      fill: {
        opacity: [1, 1]
      },
      colors: [config.colors.primary, config.colors.secondary],
      dataLabels: {
        enabled: false
      },
      grid: {
        show: false,
        padding: {
          top: -40,
          bottom: -20,
          left: -10,
          right: -2
        }
      },
      xaxis: {
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      responsive: [
        {
          breakpoint: 1468,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '22%'
              }
            }
          }
        },
        {
          breakpoint: 1197,
          options: {
            chart: {
              height: 212
            },
            plotOptions: {
              bar: {
                borderRadius: 8,
                columnWidth: '26%'
              }
            }
          }
        },
        {
          breakpoint: 783,
          options: {
            chart: {
              height: 210
            },
            plotOptions: {
              bar: {
                borderRadius: 6,
                columnWidth: '28%'
              }
            }
          }
        },
        {
          breakpoint: 589,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '16%'
              }
            }
          }
        },
        {
          breakpoint: 520,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 6,
                columnWidth: '18%'
              }
            }
          }
        },
        {
          breakpoint: 426,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 5,
                columnWidth: '20%'
              }
            }
          }
        },
        {
          breakpoint: 381,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '24%'
              }
            }
          }
        }
      ],
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof totalEarningChartEl !== undefined && totalEarningChartEl !== null) {
    const totalEarningChart = new ApexCharts(totalEarningChartEl, totalEarningChartOptions);
    totalEarningChart.render();
  }

  //  For Datatable
  // --------------------------------------------------------------------
  var dt_projects_table = $('.datatables-projects');

  if (dt_projects_table.length) {
    var dt_project = dt_projects_table.DataTable({
      ajax: assetsPath + 'json/user-profile.json',
      columns: [
        { data: '' },
        { data: 'id' },
        { data: 'project_name' },
        { data: 'project_leader' },
        { data: '' },
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          checkboxes: true,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          }
        },
        {
          // Avatar image/badge, Name and post
          targets: 2,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $user_img = full['project_img'],
              $name = full['project_name'],
              $date = full['date'];
            if ($user_img) {
              // For Avatar image
              var $output =
                '<img src="' + assetsPath + 'img/icons/brands/' + $user_img + '" alt="Avatar" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6);
              var states = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['project_name'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar avatar-sm me-3">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<h6 class="text-truncate mb-0">' +
              $name +
              '</h6>' +
              '<small class="text-truncate">' +
              $date +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // Task
          targets: 3,
          render: function (data, type, full, meta) {
            var $task = full['project_leader'];
            return '<span class="text-heading">' + $task + '</span>';
          }
        },
        {
          // Teams
          targets: 4,
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            var $team = full['team'],
              $team_item = '',
              $team_count = 0;
            for (var i = 0; i < $team.length; i++) {
              $team_item +=
                '<li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" title="Kim Karlos" class="avatar avatar-sm pull-up">' +
                '<img class="rounded-circle" src="' +
                assetsPath +
                'img/avatars/' +
                $team[i] +
                '"  alt="Avatar">' +
                '</li>';
              $team_count++;
              if ($team_count > 2) break;
            }
            if ($team_count > 2) {
              var $remainingAvatars = $team.length - 3;
              if ($remainingAvatars > 0) {
                $team_item +=
                  '<li class="avatar avatar-sm">' +
                  '<span class="avatar-initial rounded-circle pull-up text-heading" data-bs-toggle="tooltip" data-bs-placement="top" title="' +
                  $remainingAvatars +
                  ' more">+' +
                  $remainingAvatars +
                  '</span >' +
                  '</li>';
              }
            }
            var $team_output =
              '<div class="d-flex align-items-center">' +
              '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2">' +
              $team_item +
              '</ul>' +
              '</div>';
            return $team_output;
          }
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full['status'];
            return (
              '<div class="d-flex align-items-center">' +
              '<div class="progress w-100 me-3" style="height: 6px;">' +
              '<div class="progress-bar" style="width: ' +
              $status_number +
              '" aria-valuenow="' +
              $status_number +
              '" aria-valuemin="0" aria-valuemax="100"></div>' +
              '</div>' +
              '<span class="text-heading">' +
              $status_number +
              '</span></div>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          searchable: false,
          title: 'Action',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-icon btn-text-secondary waves-effect waves-light rounded-pill dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-md"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[2, 'desc']],
      dom: '<"card-header pb-0 pt-sm-0"<"head-label text-center"><"d-flex justify-content-center justify-content-md-end"f>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 5,
      lengthMenu: [5, 10, 25, 50, 75, 100],
      language: {
        search: '',
        searchPlaceholder: 'Search Project',
        paginate: {
          next: '<i class="ti ti-chevron-right ti-sm"></i>',
          previous: '<i class="ti ti-chevron-left ti-sm"></i>'
        }
      },
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of "' + data['project_name'] + '" Project';
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
    $('div.head-label').html('<h5 class="card-title mb-0">Project List</h5>');
  }

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
})();
