/**
 * Dashboard Integration Example
 * 
 * This shows how to integrate the TeamsIndexView into the existing dashboard structure.
 * Add this case to the renderTabContent switch statement in dashboardpage.tsx
 */

import TeamsIndexView from '../Foundry/Views/TeamsIndexView'
import { mockTeamSummary } from '../Foundry/test-data'

// This is the complete teams case for the dashboard
export const teamsCase = () => {
  return (
    <TeamsIndexView
      teams={mockTeamSummary}
      onCreateTeam={async () => {
        console.log('Create new team')
        // Future: Open team creation dialog
      }}
      onTeamOpen={(team) => {
        console.log('Open team:', team.name)
        // Future: Navigate to team detail view
        // setActiveTab('team-detail')
        // setSelectedTeam(team)
      }}
      // onTeamManage prop removed because it is not defined in TeamsIndexViewProps
    />
  )
}

/**
 * Integration Instructions:
 * 
 * 1. Add the following imports to dashboardpage.tsx:
 *    import TeamsIndexView from '../Views/TeamsIndexView'
 *    import { mockTeamSummary } from '../../DigitalColleagues/test-data'
 * 
 * 2. Add this case to the renderTabContent switch statement:
 *    case "teams":
 *      return <TeamsIndexView
 *        teams={mockTeamSummary}
 *        onCreateTeam={() => console.log('Create new team')}
 *        onTeamOpen={(team) => console.log('Open team:', team.name)}
 *        onTeamManage={(team) => console.log('Manage team:', team.name)}
 *      />
 * 
 * 3. The sidebar already includes a "Teams" item in mockSidebarItems.
 *    The navigation logic should handle setting activeTab to "teams" when clicked.
 * 
 * 4. Future enhancements:
 *    - Add team creation dialog
 *    - Add team detail view
 *    - Add team management functionality
 *    - Integrate with real data API
 */

export const dashboardIntegrationExample = {
  teamsCase,
  instructions: `
    Follow the integration instructions above to add teams functionality
    to the existing dashboard structure.
  `
}
