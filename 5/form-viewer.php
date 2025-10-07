<?php

function h($v) { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }

$method_used = $_SERVER['REQUEST_METHOD'] ?? 'UNKNOWN';
$data = $_REQUEST;

unset($data['_methodChooser']);

?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Form Viewer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { 
        font-family: system-ui, San Fransisco, Segoe UI, Roboto, sans-serif; 
        margin: 2rem; 
        line-height: 1.4; 
    }
    h1 { 
        margin-bottom: .25rem; 
    }
    .meta { 
        color: darkgrey; 
        margin-top: 0; 
    }
    table { 
        border-collapse: collapse; 
        width: 100%;
        max-width: 800px; 
    }
    th, td { 
        border: 1px solid grey; 
        padding: .5rem .6rem;
        vertical-align: top; 
    }
    th { 
        color: darkgrey; 
        text-align: left; 
        width: 30%; 
    }
    ul { 
        margin: 0; 
        padding-left: 1.25rem; 
    }
  </style>
</head>
<body>
  <h1>Submitted Form Data</h1>
  <p class="meta">HTTP method used: <strong><?php echo h($method_used); ?></strong></p>

  <?php if (empty($data)): ?>
    <p>No data received. Go back and submit the form.</p>
  <?php else: ?>
    <table aria-label="Submitted key-value pairs">
      <thead>
        <tr>
          <th>Field Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($data as $key => $value): ?>
          <tr>
            <th><?php echo h($key); ?></th>
            <td>
              <?php if (is_array($value)): ?>
                <ul>
                  <?php foreach ($value as $item): ?>
                    <li><?php echo h($item); ?></li>
                  <?php endforeach; ?>
                </ul>
              <?php else: ?>
                <?php
                  $out = trim((string)$value) === '' ? '<span class="empty">[empty]</span>' : h($value);
                  echo $out;
                ?>
              <?php endif; ?>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</body>
</html>