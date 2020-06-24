import { Component, Input } from '@angular/core';
import { IncidentTypes } from '@data/incident';
import { formatUnixtimeWithDot } from '@app/helpers/datetime-formatter';

@Component({
  selector: 'map-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent {
  @Input() incidents: IncidentTypes.IncidentsCollectionByType;
  @Input() incidentNotifications: IncidentTypes.IncidentNotificationsCollections;
  @Input() selectIncident: (incident: IncidentTypes.Incident) => void;

  public resolved = false;

  public incidentStatusClass = {
    MANUAL_POSITION_MODE: 'dangerLvl1',
    ATTEMPTED_CONTACT: 'dangerLvl5',
    LONG_TERM_PARKED: 'dangerLvl0',
    RESOLVED: 'dangerLvl0',
  };

  public trackByIncidents = (index: number, item: IncidentTypes.Incident) => {
    return item.id;
  }

  public switchShowResolved = () => {
    this.resolved = !this.resolved;
  }

  formatDate(incident: IncidentTypes.Incident) {
    return formatUnixtimeWithDot(incident.lastKnownLocation.timestamp);
  }
}
