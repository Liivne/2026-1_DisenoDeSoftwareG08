import dashboardRepository from "./dashboard.repository.js";

export class DashboardService {
  async getSummary() {
    return dashboardRepository.getSummary();
  }
}

export default new DashboardService();